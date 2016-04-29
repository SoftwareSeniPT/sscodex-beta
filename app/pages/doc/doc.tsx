// React
import * as React from "react";

// Connect
import {connect} from "react-redux";

// Ownee components
import Sidebar from "../../components/sidebar/sidebar";
import {SearchForm} from "../../components/search-form/search-form";
import {Content} from "../../components/content/content";

// Action
import {getDoc, searchDoc} from "./doc.act";

// Styles
const style: any = require("./doc.css");

/*
 * Import --------------------
 */

export class Doc extends React.Component<any, {}> {
    public defaultSlug = "introduction";
    componentDidMount() {
      const {dispatch, params} = this.props;
      if (params.slug !== undefined) {
        dispatch(getDoc(params.slug));
        return;
      }
      dispatch(getDoc(this.defaultSlug));
    }

    componentWillReceiveProps(props) {
      const {dispatch} = this.props;
      const oldSlug = this.props.params.slug;
      let slug = props.params.slug;
      if (oldSlug !== slug) {
        if (slug === undefined) {
          slug = this.defaultSlug;
        }
        dispatch(getDoc(slug));
      }
    }

    render(): React.ReactElement<{}> {
        const {docs, dispatch} = this.props;
        const {data, status, search, onSearchPage} = docs;
        return (
            <div className={`doc ${style.doc}`}>
              <Sidebar className={style.sidebar} />
              <SearchForm 
                status={status} 
                searchDoc={(query) => dispatch(searchDoc(query)) } />
              <Content 
                title={data.title} 
                onSearchPage={onSearchPage}
                searchData={search.posts}
                content={data.content} />
            </div>
        );
    }
}; 

export default connect(function(state: any): any {
  return {
    docs: state.docReducer
  };
})(Doc);
