import React, { Component } from 'react';
import * as utils from '../utils/reg.js';

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { wall } = this.props;
    return(
      <div className="col-sm-7 col-md-7 col-lg-8 col-xl-9 dashboard">
        <div className="wall m-t-1">
          <button type="button" className="btn btn-primary" onClick={this.props.onAddPost}>Добавить пост</button>
          <hr/>
            <div className="row">
              <div className="col-lg-6">
                {
                  wall.map(function(element, index) {
                    if(element.attachment) {
                      const { type, photo, video } = element.attachment;
                      const { text } = element;
                      return (
                        <div className="wall-post" key={index}>
                          { text && <p className="wall-post__text" dangerouslySetInnerHTML={utils.createMarkup(text)}></p> }
                          { type === 'photo' && <img src={photo.src_big} className="img-fluid" alt={`wall-post-img${index}`} /> }
                          { type === 'video' && 
                            <strong className="text-danger">Пост с видео (в разработке)</strong>
                          }
                        </div>
                      );
                    }       
                  }, this)
                }
              </div>
              <div className="col-lg-6">
                <div className="news">
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex molestiae nesciunt nulla repellat optio laborum expedita dignissimos voluptate nisi autem.</p>
                </div>
              </div>
           </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;