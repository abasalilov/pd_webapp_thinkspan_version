/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import mobiscroll from "@mobiscroll/react";
// import { simpleAction } from './actions';
import Logo from '../../media/images/pd-logo-text.jpg';
import PdMag from '../../media/images/pd-mag-glass.png';

class FooterSectionComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displayFooterBtn: false
    }
    this.handleClick = this.handleClick.bind(this);
  }

   async componentDidMount(){
    //    await this.props.simpleAction(); 
     document.addEventListener("keydown", this.handleClick);
    }

  async componentWillUnmount() {
    //    await this.props.simpleAction(); 
    document.addEventListener("keydown", this.handleClick);
  }

  handleClick() {
    const {displayFooterBtn} = this.state;
    this.setState({displayFooterBtn: !displayFooterBtn});
  }
    
    render() {
        return (
          <div className="footer" style={{ backgroundColor: "#000", paddingTop:"1rem"}}>
            <div className="mbsc-grid">
              <div
                className="mbsc-row mbsc-justify-content-start"
                style={{border:"none",
               backgroundColor:"#000"}}
              >
                <div className="mbsc-col-2">
                  <div
                    style={{display:'flex', flexDirection:"row", marginLeft:"2rem", marginTop:".5rem", marginBottom:".5rem"}}
                  >
                    <img
                      src={PdMag}
                      style={{width:"50px"}}
                      alt="Parts Detect logo"
                    />
                    <img 
                      src={Logo}
                      style={{ width: "125px", paddingTop:".5rem", paddingBottom:".5rem" }}
                      alt="Parts Detect logo"
                    />
                  </div>
                </div>
                <div className="mbsc-col-1" />
                <div className="mbsc-col-3" />
                <div className="mbsc-col-1" />
                <div className="mbsc-col-1" />
                <div className="mbsc-col-2" style={{color:"white", display:'flex', flexDirection:"row", justifyContent:"space-between", marginTop:"1rem"}}>

                  <div>
                    <span 
                      style={{ color: "white", border: "solid #666 1px", padding:"1rem", marginTop:"2px" }}
                      className="mbsc-ic mbsc-ic-fa-facebook"
                    />
                  </div>

                  <div>
                    <span
                      style={{ color: "white", border: "solid #666 1px", padding: "1rem", marginTop: "2px" }}
                      className="mbsc-ic mbsc-ic-fa-twitter"
                    />
                  </div>                  
                  {' '}
                  <div>
                    <span
                      style={{ color: "white", border: "solid #666 1px", padding: "1rem", marginTop: "2px" }}
                      className="mbsc-ic mbsc-ic-fa-google-plus"
                    />
                  </div>                    
                  {' '}
                  <div>
                    <span
                      style={{ color: "white", border: "solid #666 1px", padding: "1rem", marginTop: "2px" }}
                      className="mbsc-ic mbsc-ic-mobile"
                    />
                  </div>
                </div>
              </div>
              <div
                className="mbsc-row mbsc-justify-content-start" 
                style={{border:"none", margin:"0"}}
              >
                <div className="mbsc-col-1" />
                <div
                  className="mbsc-col-1"
                  style={{ color: "white" }}
                >
                  About
                </div>
                <div className="mbsc-col-1" />
                <div className="mbsc-col-1" style={{ color: "white" }}>Blog</div>
                <div className="mbsc-col-1" />
                <div className="mbsc-col-1" style={{ color: "white" }}>Vendors</div>       
                <div className="mbsc-col-1" />
                <div className="mbsc-col-1" style={{ color: "white" }}>Legal</div>
                <div className="mbsc-col-1" />
                <div className="mbsc-col-1" />
              </div>
            </div>
          </div>
    );
    }
}

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
// simpleAction: () => dispatch(simpleAction())
});

export const FooterSection = connect(mapStateToProps, mapDispatchToProps)(FooterSectionComponent);
