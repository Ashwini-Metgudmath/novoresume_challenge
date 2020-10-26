import React, { Component, Fragment } from "react";
import "./home.scss";

export default class Home extends Component {
  render() {
    const { showModal } = this.props;
    return (
      <Fragment>
        <div className="container" id="register">
          <div>
            <div className="container-text">
              <h1>
                A better, faster and smarter <br /> way of building you offers.
              </h1>
              <p>
                Increase you revenue and outshine competation. All for <br /> a
                price of a coffee.
              </p>
            </div>
            <div>
              <div className="btnv-1" onClick={this.props.showModal}>
                <span>Register Today</span>
              </div>
            </div>
          </div>
          <div className="graphic-img">
            <img
              src={`${process.env.PUBLIC_URL}/images/background/header3.png`}
              alt="graphic image"
            ></img>
          </div>
        </div>
        <section className="my-services" id="services">
          <h2 className="section__title section__title--services">
            What do we do?
          </h2>
          <div className="services">
            <div className="service">
              <img
                src={`${process.env.PUBLIC_URL}/images/icons/offer1.png`}
                alt="graphic image"
              />
              <h2>Amazing looking quotes</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur
                <br />
                adipiscing elit, sed do eiusmod tempor
                <br />
                incididunt ut labore et dolore magna <br />
                aliqua
              </p>
            </div>
            <div className="service">
              <img
                src={`${process.env.PUBLIC_URL}/images/icons/fast1.png`}
                alt="graphic image"
              />
              <h2>Lighting fast quoting</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur
                <br />
                adipiscing elit, sed do eiusmod tempor
                <br />
                incididunt ut labore et dolore magna <br />
                aliqua
              </p>
            </div>
            <div className="service">
              <img
                src={`${process.env.PUBLIC_URL}/images/icons/log1.png`}
                alt="graphic image"
              />
              <h2>Live Changelog</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur
                <br />
                adipiscing elit, sed do eiusmod tempor
                <br />
                incididunt ut labore et dolore magna <br />
                aliqua
              </p>
            </div>
          </div>
          <div className="btnv-1" onClick={this.props.showModal}>
            <span>Try it out today</span>
          </div>
        </section>
        <section className="my-services blog" id="blogPosts">
          <h2 className="section__title section__title--services">
            Recent blog posts
          </h2>
          <div className="services">
            <div className="service">
              <img
                src={`${process.env.PUBLIC_URL}/images/background/image-1.png`}
                alt="graphic image"
              />
              <h2>Promotional items</h2>
              <p>
                You are probably familiar with free <br />
                merchandise offered by companies at no <br /> cost at all. This
                is because they know...
              </p>
              <span>
                <a href="#">Read more...</a>
              </span>
            </div>
            <div className="service" id="eachBlog">
              <img
                src={`${process.env.PUBLIC_URL}/images/background/image-3.png`}
                alt="graphic image"
              />
              <h2>Promotional items</h2>
              <p>
                You are probably familiar with free <br />
                merchandise offered by companies at no <br /> cost at all. This
                is because they know...
              </p>
              <span>
                <a href="#">Read more...</a>
              </span>
            </div>
            <div className="service">
              <img
                src={`${process.env.PUBLIC_URL}/images/background/image-2.png`}
                alt="graphic image"
              />
              <h2>Promotional items</h2>
              <p>
                You are probably familiar with free <br />
                merchandise offered by companies at no <br /> cost at all. This
                is because they know...
              </p>
              <span>
                <a href="#">Read more...</a>
              </span>
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}
