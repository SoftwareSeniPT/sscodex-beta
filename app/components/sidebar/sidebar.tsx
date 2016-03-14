// React
import * as React from "react";

// Styles
const style: any = require("./sidebar.css");

// Connect
import {connect} from "react-redux";

// Component
import {Logo} from "../../components/logo/logo";

// Action
import {getCategories, toogleOpenCategory} from "./sidebar.act";
import {immutable} from "../../services/immutable/immutable";

// Link
import {Link} from "react-router";

/*
 * Import --------------------
 */

export class Sidebar extends React.Component<any, any> {
    componentDidMount() {
      const {dispatch} = this.props;
      dispatch(getCategories());
    }

    categoryParser (categories = []) {
      "use strict";
      if (!categories.length) {
        return;
      }
      const filteredCat = categories.filter((cat, key) => {
        if (cat.parent === 0) {
          return true;
        }
        return false;
      });
      return filteredCat.map((cat, key) => {
        const catID = cat.ID;
        return immutable(cat, {
          children: categories.filter((cat, key) => {
            if (catID === cat.parent) {
              return true;
            }
            return false;
          })
        });
      });
    };

    toogleOpenCategory(categoryID, opened) {
      const {dispatch} = this.props;
      dispatch(toogleOpenCategory(categoryID, opened));
    }

    render(): React.ReactElement<{}> {
      const {sidebarData, className} = this.props;
      const {status} = sidebarData;
      const categories = this.categoryParser(sidebarData.categories);

      return (
        <div className={`sidebar ${className}`}>
          <div className={style.logo}>
            <Logo />
          </div>
          <div 
            className={style.categories}>
            {status === "COMPLETE" && categories.length ? categories.map((category, key) => {
              const {name, ID, opened, posts = [], children = []} = category;
              return (
                <div className={`${style.mainCategory} ${opened ? style.opened : style.closed}`} key={key}>
                  <h3 
                    className={style.mainCategoryTitle}
                    onClick={(e) => opened ? this.toogleOpenCategory(ID, false) : this.toogleOpenCategory(ID, true) }>
                    {name}
                  </h3>
                  <div 
                    className={style.listWrapper}
                    style={opened ? { maxHeight: "100%" } : { maxHeight: 0 }}>
                    <ul>
                      {posts.map((post, key) => {
                        const {title, slug} = post;
                        return (
                          <li key={key}>
                            <Link to={`/doc/${slug}`}>{title}</Link>
                          </li>
                        );
                      })}

                      {children.map((post, key) => {
                        const {name, ID, opened, posts = []} = post;
                        return (
                          <li key={key} className={opened ? style.opened : style.closed}>
                            <span 
                              className={style.parentLabel}
                              onClick={() => opened ? this.toogleOpenCategory(ID, false) : 
                              this.toogleOpenCategory(ID, true)}>{name}</span>
                            {posts.length ? 
                              <div
                                className={style.listWrapper}
                                style={opened ? { maxHeight: "100%" } : { maxHeight: 0 }}>
                                <ul>
                                  {posts.map((post, key) => {
                                    const {title, slug} = post;
                                    return (
                                      <li key={key}>
                                        <Link to={`/doc/${slug}`}>{title}</Link>
                                      </li>
                                    );
                                  })}
                                </ul>
                              </div>
                            : null}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              );
            }) : null }
          </div>
        </div>
      );
    }
};

export default connect(function(state: any): any {
  return {
    sidebarData: state.sidebarReducer
  };
})(Sidebar);
