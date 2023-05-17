import React from 'react';
import Image from 'next/image'
import SVG from '@/images/pedestrian_crossing.svg'

class ComingSoonPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        msg: '',
        color: 'green',
    }
  }

  requestAddToEmailList = async (payload) => {
    
    if (payload.special_req && payload.special_req.trim() !== ''){
        return  { msg: `Error: We are unable to process your request at this time.`, color: "yellow"  };
    } else {
        const fetchRoute = "/api/promotion/coming-soon";
        const response = await fetch(fetchRoute, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });
            
        const data = await response.json();
        if( data.status >= 400){
            return { msg: `Error ${data.status}: ${data.title}`, color: "red"  }
        } else {
            return { msg: "You have been added to the email list", color: "green"  }
        }    
    }
} 
  handleSubmit = async (e) => {
    e.preventDefault();

    let response = await this.requestAddToEmailList({
        email: e.target.email.value,
        firstName: e.target.given_name.value,
        lastName: e.target.family_name.value,
        special_req: e.target.special_req.value,
    })

    if( response.msg ){
        this.setState({ msg: response.msg, color: response.color })
    } 
  }
 
  render() {
    return(
            <div className="uc__wrapper">
                <div className="uc__details">
                    <h1 className="title">Coming Soon!</h1>
                    <h3 className="intro">
                        We are working hard to give you a new experience to aid in navigating the world.   
                    </h3>
                    <p className="uc__description">
                        Our Site is almost ready, so are you ready for the most user-friendly navigational aid tool? 
                        Be one of the first to experience it by entering your email and name below. As we will notify you as soon as Soundscape goes live and has any updates.    
                        We are in this together, our community striving to reach our goals one obstacle at a time! 
                    </p>
                    <div className="uc__subscribe">
                        <h3>Get Notified When We Go Live</h3>
                        <div className="uc__form">
                            <form action="#"  onSubmit={this.handleSubmit}>
                                <div className="flex flow-row input-top ">
                                    <input type="text" className="fn-input" name="given_name" placeholder="First Name" required />
                                    <input type="text"  className="ln-input" name="family_name" placeholder="Last Name" required />
                                </div>
                                <input type="email" className="email" name="email" placeholder="Email Address"required/>
                                <input type="text" className="special_req" name="special_req" placeholder=""/>
                                <input type="submit" className="submit" value="Get Notified"/>
                                <input type="submit" className="submit-small" value=""/>

                            </form>
                        </div>
                        <p className="res-msg" style={{color: this.state.color}}>{this.state.msg}</p>
                    </div>
                </div>
                <div className="uc__art">
                    <Image className="dev" src={SVG} alt="" />
                </div>
            </div>
    );
  }
}

export default ComingSoonPage 