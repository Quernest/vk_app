import React, { Component } from 'react';

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
              <div className="col-sm-6">
                {wall.map((item, index) => {
                  const { attachment } = item;
                  if(attachment) {
                    const { photo } = attachment;
                    return (
                      <div className="wall-post">
                        <img src={photo.src_big} className="img-fluid img-rounded" alt=""/>
                        <p className="wall-post__text">{item.text}</p>
                      </div>
                    );
                  } else console.log(false);
                })}
              </div>
              <div className="col-sm-6">
                <h3>Тут будет лента новостей</h3>
              </div>
           </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;