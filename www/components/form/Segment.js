import React from 'react';

class Segment extends React.Component {
  getContainerClassName() {
    const res = ['segment'];
    if (!this.props.schema.header) {
      res.push('no-header');
    }
    return res.join(' ');
  }

  renderHeadline() {
    if (this.props.schema.header) {
      return (
        <h3>{this.props.schema.header}</h3>
      );
    }
    return null;
  }

  renderChildren() {
    return this.props.children;
  }

  render() {
    return (
      <div className={this.getContainerClassName()} id={this.props.schema.id}>
        {this.renderHeadline()}
        {this.renderChildren()}
      </div>
    );
  }
}

Segment.propTypes = {
  schema: React.PropTypes.object,
  children: React.PropTypes.array,
};

export default Segment;
