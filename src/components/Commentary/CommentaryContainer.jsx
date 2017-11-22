import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import throttle from "../../utils/throttle";

import Commentary from "./Commentary.jsx";

@observer
class CommentaryContainer extends Component {
  DOMNode = null;
  state = {
    markdown: null,
    scrollProgress: null,
    hasScrolled: false
  };

  bindRef = ref => (this.DOMNode = ref);

  componentDidMount() {
    //this.updateMarkdown(this.props.markdown);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.markdown !== this.props.markdown) {
      this.updateMarkdown(this.props.markdown);
    }
  }

  updateMarkdown = async markdown => {
    let newMarkdown = await markdown;
    this.setState(
      () => ({ markdown: newMarkdown }),
      () => {
        this.DOMNode.scrollTop = 0;
        if (
          this.state.hasScrolled &&
          this.DOMNode.scrollHeight > this.DOMNode.clientHeight
        ) {
          this.setState(() => ({ hasScrolled: false }));
        } else if (
          !this.state.hasScrolled &&
          this.DOMNode.scrollHeight <= this.DOMNode.clientHeight
        ) {
          this.setState({ hasScrolled: true });
        }
      }
    );
  };

  delaySetScrollProgress = throttle(
    ({ scrollTop, scrollHeight, clientHeight }) => {
      this.setState({
        scrollProgress: scrollTop / (scrollHeight - clientHeight)
      });
    },
    75
  );

  handleScroll = e => {
    let { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    this.delaySetScrollProgress({ scrollTop, scrollHeight, clientHeight });
    if (!this.state.hasScrolled && scrollTop) {
      this.setState({ hasScrolled: true });
    }
  };

  handleScrollIndicatorClick = () => (this.DOMNode.scrollTop = 100);

  render() {
    return (
      <div>
        <Commentary
          innerRef={this.bindRef}
          markdown={this.props.markdown}
          handleScroll={this.handleScroll}
          hasScrolled={this.state.hasScrolled}
          handleScrollIndicatorClick={this.handleScrollIndicatorClick}
          scrollProgress={this.state.scrollProgress}
        />
      </div>
    );
  }
}

export default inject(stores => ({
  markdown: stores.UIStore.commentaryStore.commentary,
  storyProgress: stores.UIStore.storyProgress
}))(CommentaryContainer);
