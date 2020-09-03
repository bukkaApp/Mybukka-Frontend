/* eslint-disable array-callback-return */
/* eslint-disable max-len */
import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import ListItem from './ListItem';

import './category.scss';
import '../support/components/supportmainsection.scss';
import './relatedcomlainarticle.scss';

const ListItemGroup = ({ heading, items, listType }) => (
  <div>
    {heading &&
      <h6 className="dropdown_article_heading">{heading}</h6>}
    <ListItem listType={listType} items={items} />
  </div>
);

const Paragraph = ({ heading, paragraphs }) => (
  <div className="dropdown_article_item ml-4">
    {heading && <h6 className="dropdown_article_heading">{heading}</h6>}
    {
      paragraphs.length > 0 && paragraphs.map(paragraph => <p>{paragraph}</p>)
    }
  </div>
);

const ArticleDropdown = ({ heading, children }) => {
  const [active, setActive] = useState(false);
  return (
    <div className="ml-3">
      {!heading.includes('inputBox') &&
      <div
        onClick={() => setActive(!active)}
        aria-pressed="false"
        tabIndex="0"
        role="button"
        className="d-flex justify-content-between text-capitalize mt-3 mb-3 unselectable"
      >
        <h5 className="dropdown_article_text">{heading}</h5>
        {active && <i className="dropdown_article_icon">-</i>}
        {!active && <i className="dropdown_article_icon">+</i>}
      </div>
      }
      {heading.includes('inputBox') && <br />}
      {(active || heading.includes('inputBox')) && children}
    </div>
  );
};

const InputDropdown = ({ heading, items }) => (
  <div className="form-group">
    <label htmlFor="tellUsMoreAboutCompain">
      <span className="unselectable">{heading}</span>
      <span className="text-danger">*</span>
    </label>
    <select
      className="form-control"
      id="tellUsMoreAboutCompain"
      defaultValue="-"
      style={{ height: '50px' }}
    >
      {items.map(item => (
        <option>{item}</option>
      ))}
    </select>
  </div>
);

export const RelatedComplainArticle = ({ data = {}, /* heading */ }) => (
  <div>
    {Object.keys(data).map(eachData =>
      (<Fragment>
        <ArticleDropdown heading={eachData}>
          {
            data[eachData].map(el => (
              <Fragment>
                {el.list && <ListItemGroup {...el} />}
                {el.dropdown && <InputDropdown {...el} />}
                {(!el.list && el.paragraph) && <Paragraph {...el} />}
              </Fragment>
            ))
          }
        </ArticleDropdown>
      </Fragment>)
    )}
  </div>
);

export default RelatedComplainArticle;

RelatedComplainArticle.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

ListItemGroup.defaultProps = {
  heading: '',
  items: [],
  listType: false
};

ListItemGroup.propTypes = {
  heading: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.string),
  listType: PropTypes.bool,
};

Paragraph.defaultProps = {
  heading: '',
  paragraphs: [],
};

Paragraph.propTypes = {
  heading: PropTypes.string,
  paragraphs: PropTypes.arrayOf(PropTypes.string),
};

ArticleDropdown.defaultProps = {
  handleClick: () => {},
  children: '',
  heading: '',
};

ArticleDropdown.propTypes = {
  heading: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

InputDropdown.defaultProps = {
  items: [],
  heading: '',
};

InputDropdown.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string),
  heading: PropTypes.string,
};
