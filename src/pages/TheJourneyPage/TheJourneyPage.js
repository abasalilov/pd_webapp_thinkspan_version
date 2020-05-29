/* eslint-disable react/prefer-stateless-function */
/* eslint-disable max-classes-per-file */
/* eslint-disable import/prefer-default-export */
/* eslint-disable react/prop-types */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from "react";
import {Card, CardHeader, CardContent, CardTitle, CardSubtitle, Form, Listview, Note} from "@mobiscroll/react";
import "./journey.css";

class ListItem extends React.Component {
  render() {
    const classes = `${this.props.item.id % 2 == 0 ? 'custom-card-rotate-right' : (this.props.item.id % 3 == 0 ? 'custom-card-rotate-left' : '')  } custom-card`;

    return (
      <li>
        <Card
          className={classes}
          theme="ios"
          themeVariant="light"
        >
          <CardHeader>
            <CardTitle>{this.props.item.title}</CardTitle>
            <CardSubtitle>{this.props.item.desc}</CardSubtitle>
          </CardHeader>
          <CardContent>
            <img draggable="false" src={this.props.item.img} />
          </CardContent>
        </Card>
      </li>
    );
  }
}


class TheJourneyPageComponent extends Component {

  stages = [{
    percent: -20,
    action: (event, inst) => {
      inst.remove(event.target);
      return false;
    }
  }, {
    percent: 20,
    action: (event, inst) => {
      inst.remove(event.target);
      return false;
    }
  }];

  cycleStages = [{
    percent: -20,
    action: (event, inst) => {
      inst.move(event.target, 0);
      return false;
    }
  }, {
    percent: 20,
    action: (event, inst) => {
      inst.move(event.target, 0);
      return false;
    }
  }];

  constructor(props) {
    super(props);
    this.state = {
      items: [{
        id: 1,
        title: "The Adventure Begins ",
        desc: 'Aiming High',
        img: "https://res.cloudinary.com/dbfv0bfmw/image/upload/v1588021843/pd-web-app-journey-b.png"
      }, {
        id: 2,
        title: 'The Journey Continues',
        desc: 'Splashes along the way.',
        img: "https://res.cloudinary.com/dbfv0bfmw/image/upload/v1588021843/pd-web-app-journey-b.png"
      }, {
        id: 3,
        title: 'Big Day With Parts Authority',
        desc: 'A LinkedIn profile pic LOL',
        img: "https://res.cloudinary.com/dbfv0bfmw/image/upload/v1588021853/pd-web-app-journey-c.png"
      }, 
      {
        id: 8,
        title: `Grinding`,
        desc: `I'm not a businessman, I'm a business man.`,
        img: "https://res.cloudinary.com/dbfv0bfmw/image/upload/v1588021865/pd-web-app-journey-j.png"
      },
      {
        id: 4,
        title: 'Happy birthday!',
        desc: 'Before my beard got grey hahahaha',
        img: "https://res.cloudinary.com/dbfv0bfmw/image/upload/v1588021840/pd-web-app-journey-d.png"
      },
      {
        id: 7,
        title: 'Progress and recognition in the blink of an eye',
        desc: 'The difference between building materials and a building is leadership, thank you Staniel!',
        img: "https://res.cloudinary.com/dbfv0bfmw/image/upload/v1588021861/pd-web-app-journey-g.png"
        }, 
        {
        id: 6,
        title: "Graduation",
        desc: 'Nerd graduations can get pretty wild',
        img: "https://res.cloudinary.com/dbfv0bfmw/image/upload/v1588021863/pd-web-app-journey-f.png"
        }, 
        {
        id: 9,
        title: 'Partners in Crime',
        desc: 'Isaac (middle-left), Paul (middle-right)',
        img: "https://res.cloudinary.com/dbfv0bfmw/image/upload/v1588021874/pd-web-app-journey-k.png"
        }, 
        {
        id: 5,
        title: 'Amazing Presentation!',
        desc: 'Easily the most captivating story that night',
        img: "https://res.cloudinary.com/dbfv0bfmw/image/upload/v1588021861/pd-web-app-journey-e.png"
        }, 
        {
        id: 10,
        title: 'We go way back, but we go forward',
        desc: 'Our Chief Financial Officer and Badass Bitch, V.',
        img: "https://res.cloudinary.com/dbfv0bfmw/image/upload/v1588021862/pd-web-app-journey-l.png"
        }]
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }


  render() {
    const { isMobile } = this.props;
    const marginTop = isMobile ? "50px" : "50px";
    const w = isMobile ? "100%" : "45%"

    return (
      <Form>
        <div className="app-tab">
          <div className="app-header" style={{ marginTop }}>
            <h1>The Journey</h1>
          </div>
          <div className="mbsc-form-group" style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:'center'}}>
            <div style={{width:w }}>
              <Note color="primary">Swipe cards away left or right to clear stack.</Note>
              <Listview
                className="mbsc-card-list custom-card-deck"
                theme="ios"
                themeVariant="light"
                itemType={ListItem}
                data={this.state.items}
                stages={this.stages}
                actionable={false}
              />
            </div>
          </div>
        </div>
      </Form>
    );
  }
}

export const TheJourneyPage = TheJourneyPageComponent;
