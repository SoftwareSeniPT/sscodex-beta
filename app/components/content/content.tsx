/*
 * Interface
 */ 

interface IContentProps {
  title: string;
  content: string;
}

interface IContentState {
}

// React
import * as React from "react";

// Styles
const style: any = require("./content.css");

/*
 * Import --------------------
 */

export class Content extends React.Component<IContentProps, IContentState> {
    render(): React.ReactElement<{}> {
        const {title, content} = this.props;
        return (
            <div className={`content ${style.content}`}>
              <h2 className={style.title}>{title}</h2>
              <div className={style.item} dangerouslySetInnerHTML={{__html: content}} />
            </div>
        );
    }
};
