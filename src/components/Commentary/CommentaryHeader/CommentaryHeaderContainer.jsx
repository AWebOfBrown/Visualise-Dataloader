import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import Animations from "./animations";
import debounce from "../../../utils/debounce";

import CommentaryHeader from "./CommentaryHeader";

@observer
class CommentaryHeaderContainer extends Component {
  DOMNode = null;
  animations = null;
  state = {
    scrollProgress: null,
    shrinkHeader: false
  };

  bindRef = ref => (this.DOMNode = ref);

  componentDidMount() {
    this.animations = new Animations({ header: this.DOMNode });
  }

  componentWillUpdate(nextProps) {
    if (nextProps.scrollProgress !== this.props.scrollProgress) {
      this.handleMarkdownScroll();
    }
  }

  handleMarkdownScroll = debounce(() => {
    let { scrollProgress } = this.props;

    if (!this.state.headerShrunk) {
      if (scrollProgress) {
        this.animations.shrinkHeader(this.DOMNode.clientHeight * 0.5);
        this.setState({ headerShrunk: true });
      }
    } else {
      if (!scrollProgress) {
        this.animations.expandHeader(this.DOMNode.clientHeight * 2);
        this.setState({ headerShrunk: false });
      }
    }
  }, 5);

  render() {
    return (
      <CommentaryHeader
        {...this.props}
        headerShrunk={this.state.headerShrunk}
        innerRef={this.bindRef}
      />
    );
  }
}

export default inject(stores => ({
  storyProgress: stores.UIStore.storyStore.storyProgress,
  storyLength: stores.UIStore.storyStore.storyLength,
  progressStory: stores.UIStore.storyStore.progressStory,
  regressStory: stores.UIStore.storyStore.regressStory,
  commentaryTitle: stores.UIStore.commentaryStore.commentaryTitle
}))(CommentaryHeaderContainer);
