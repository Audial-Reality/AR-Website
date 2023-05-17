import React, { useState } from 'react';
import Head from "next/head";
import Image from 'next/image';
import Link from 'next/link';
import { gql } from "@apollo/client";

import { getApolloClient } from "../../lib/apollo-client";

import { BsPerson, BsCalendar } from 'react-icons/bs'

//import styles from "../../styles/Home.module.css";

import WebpageWrapper from '@/WebpageWrapper'
import Banner from '@/images/post-banner-two.png';

import DOMPurify from 'isomorphic-dompurify';


export default function Post({ post, site }) {
  
  return (
    <WebpageWrapper>
        <Head>
            <link rel="stylesheet" href="http://soundscape-website.local/wp-content/themes/BingoPress/style.css" />
        </Head>
        <div className={`flex flow-col post-page-wrapper`} >
          {/* ---------------------------------------------------------------------------------------------------- */}
          <div className="post-banner" > 
            <Image loading="lazy" src={Banner} alt="Post-Banner"/>
            <div className="post-title-box">
              <h1 dangerouslySetInnerHTML={{ __html: post.translation.title, }} />
              <div className="post-title-box-below">
                <div className="post-details">
                  <span><BsCalendar size={'0.95em'} color={'white'}/>&nbsp;&nbsp;{"March 01 2023"}</span>
                </div>
              </div>
            </div>
          </div>
          {/* ---------------------------------------------------------------------------------------------------- */}
          { post.translation.content && <div className="post-content-wrapper" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.translation.content), }} /> }
          {/* ---------------------------------------------------------------------------------------------------- */}
          <Link href="/" style={{ margin: "15px auto 50px auto" }}> Back to the Home Page </Link> 
        </div>
    </WebpageWrapper>
  );
}

export async function getStaticProps({ params, locale }) {

  const { postSlug } = params;
  const language = locale.toUpperCase();

  const apolloClient = getApolloClient();

  const data = await apolloClient.query({    
    query: gql`
      query PostBySlug($slug: String!, $language: LanguageCodeEnum!) {
        generalSettings {
          title
        }
        postBy(slug: $slug) {
          id
          content
          title
          slug
          translation(language: $language) {
            id
            slug
            content
            title
            language {
              locale
              slug
            }
          }
        }
      }
    `,
    variables: {
      slug: params.postSlug,
      language,
    },
  });

  let post = data?.data.postBy;

  const site = {
    ...data?.data.generalSettings,
  };

  return {
    props: {
      post,
      language,
      path: `/posts/${post.slug}`,
      site,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths({ locales}) {
  const apolloClient = getApolloClient();

  const data = await apolloClient.query({
    query: gql`
      {
        posts(first: 10000) {
          edges {
            node {
              id
              title
              slug
            }
          }
        }
      }
    `,
  });

  const posts = data?.data.posts.edges.map(({ node }) => node);

  const paths = posts.map(({ slug }) => {
    return {
      params: {
        postSlug: slug,
      },
    };
  });

  
  return {
    paths: [
      ...paths,
      ...paths.flatMap((path) => {
        return locales.map((locale) => {
          return {
            ...path,
            locale,
          };
        });
      }),
    ],
    paths: [],
    fallback: "blocking",
  };
}