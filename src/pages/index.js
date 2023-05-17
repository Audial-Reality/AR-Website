import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'

import WebpageWrapper from '@/WebpageWrapper'

import { HeroSection } from '@/HeroSection'
import { GridSection } from '@/GridSection'
import { FeaturesSection } from "@/FeaturesSection"
import { SponsorSection } from "@/SponsorSection"
import { SupportSection } from "@/SupportSection"
import { BlogSection } from "@/BlogSection"
import { SearchBar } from "@/components/SearchBar/__index.js"

import { gql } from "@apollo/client";
import { getApolloClient } from "../lib/apollo-client";



export default function Home({ page, posts }) {
  return (
      <WebpageWrapper>
        <HeroSection />
        <FeaturesSection />
        <SponsorSection />
        <SupportSection />
        {<BlogSection  allPosts={posts} />}
      </WebpageWrapper>
  )
}


export async function getStaticProps({ locale }) {
  return { props: { page: null, posts: null } }
  /*try {
    const apolloClient = getApolloClient();
    
    const language = locale.toUpperCase();
    
    
    
    const data = await apolloClient.query({
      query: gql`
        query posts($language: LanguageCodeFilterEnum!) {
          posts(where: { language: $language }) {
            edges {
              node {
                id
                excerpt
                title
                slug
                featuredImage {
                  node {
                    id
                    sourceUrl
                    altText
                  }
                }
                language {
                  code
                  locale
                }
              }
            }
          }
          generalSettings {
            title
            description
          }
        }
      `,
      variables: {
        language,
      },
    });


    let posts = data?.data.posts.edges

      .map(({ node }) => node)
      .map((post) => {
        return {
          ...post,
          language,
          path: `/posts/${post.slug}`,
        };
      });

    const page = {
      ...data?.data.generalSettings,
    };

    return {
      props: {
        page,
        posts,
      },
    };
  } catch(error) {
    return { props: { } }
  }*/
}
