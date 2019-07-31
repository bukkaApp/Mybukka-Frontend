import React from 'react';
import PropTypes from 'prop-types';
import List, { UnOrderList, ListItem, OrderList } from '../common/List';
import UnselectableHeading from '../common/UnSelectableHeading';
import Paragraph from '../common/Paragraph';


const Content = ({ data }) => (
  <List classNames="p-0" type="number">
    {data.mainContent.map((eachContent, index) => (
      <>
        {/* main heading section */}
        <UnselectableHeading classNames="p-0 m-0 mt-5 mb-3">
          {index + 1}. {eachContent.section}
        </UnselectableHeading>
        {/* content of each main heading */}
        <OrderList classNames="p-0">
          {eachContent.article.map((eachArticle, indx) =>
            (<>
              {/* sub heading section */}
              {eachArticle.heading &&
                <UnselectableHeading
                  classNames="short-text p-0 m-0 mt-5 mb-3 inline-font"
                >
                  {index + 1}.{indx + 1}. {eachArticle.heading}
                </UnselectableHeading>}
              {/* Paragraph section */}
              {eachArticle.paragraph && eachArticle.paragraph.map(eachLine => (
                <Paragraph
                  classNames="mt-4 mb-2 short-text inline-paragraph"
                >
                  {eachLine}
                </Paragraph>))}
              {/* List items section */}
              {eachArticle.list &&
              <UnOrderList classNames="pl-3">
                {eachArticle.list.map(eachLine => (
                  <ListItem
                    classNames="m-0 mt-4 mb-2 ml-2 short-text
                    inline-paragraph disc-list"
                  >
                    {eachLine}
                  </ListItem>
                ))}
              </UnOrderList>
              }
              {/* address section */}
              {eachArticle.address &&
                <address className="mt-5">
                  {eachArticle.address.map(eachData => (
                    <em>{eachData}<br /></em>
                  ))}
                </address>}
            </>)
          )}
        </OrderList>
      </>
    ))}
  </List>
);

export default Content;


Content.defaultProps = {
  data: { mainContent: [] },
};

Content.propTypes = {
  data: PropTypes.objectOf(PropTypes.array)
};
