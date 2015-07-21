import classNames from 'classnames';
import SidebarMixin from 'global/jsx/sidebar_component';

import Header from 'common/header';
import Sidebar from 'common/sidebar';
import Footer from 'common/footer';

var GalleryList = React.createClass({
  render: function() {
    var campaignNodes = this.props.data.map(function (campaign) {
      console.log('campaign',campaign)
      return (
        <Col xs={6} sm={3} collapseRight>
          <GalleryItem image={campaign.thumbnail_url} title={campaign.name} subtitle='' />
        </Col>
      );
    });
    return (
      <div className="campaignList">
        {campaignNodes}
      </div>
    );
  }
});

var GalleryItem = React.createClass({
  getInitialState: function() {
    return {
      active: this.props.active || false,
      counts: (Math.round(Math.random() * 20) + 4)
    };
  },
  render: function() {
    return (
      <PanelContainer>
        <Panel>
          <PanelHeader>
            <Grid className='gallery-item'>
              <Row>
                <Col xs={12} style={{padding: 0}}>
                  <a className='gallery-1 gallery-item-link' href={'/imgs/gallery/'+this.props.image+'.jpg'} title={this.props.title}>
                    <Img responsive src={this.props.image} alt={this.props.title} width='200' height='150'/>
                  </a>
                  <div className='campaign-details'>
                    <h4 className='campaign-title' style={{textTransform: 'uppercase'}}>{this.props.title}</h4>
                  </div>
                </Col>
              </Row>
            </Grid>
          </PanelHeader>
        </Panel>
      </PanelContainer>
    );
  }
});

var Body = React.createClass({
  getInitialState: function() {
    return {
      campaigns: [],
      limit: 0,
      offset: 0,
      total: 0
    };
  },
  componentDidMount: function() {

    console.log("componentDidMount");

    var that = this;

    $.ajax({
      type: "POST",
      dataType: "json",
      url: "http://localhost:3001/auth/signin",
      data: {email: "fuiszmedia@gmail.com", password: "sAnta)m0nica"},
      success: function(data){
        console.log("data");
        console.log(data);

        $.get("http://localhost:3001/api/campaigns?offset=0&limit=12", function(result) {
          console.log("result");
          console.log(result);
          if (this.isMounted()) {
            console.log('this mounted');
            this.setState({
              campaigns: result.campaigns,
              limit: result.limit,
              offset: result.offset,
              total: result.total
            });
          }
        }.bind(that));
      }
    });

    // var links = document.getElementsByClassName('gallery-1');
    // console.log("links",links);
    // $('.gallery-1').unbind('click').bind('click', function(event) {
    //   blueimp.Gallery(links, {
    //     index: $(this).get(0),
    //     event: event
    //   });
    // });
  },
  render: function() {
    console.log('render ? ')
    console.log(this.state);
    return (
      <Container id='body'>
        <Grid>
          <Row className='gallery-view'>
            <GalleryList data={this.state.campaigns} />
          </Row>
        </Grid>
        {this.props.children}
      </Container>
    );
  }
});

@SidebarMixin
export default class extends React.Component {
  render() {
    console.log("GalleryPage render");
    var classes = classNames({
      'container-open': this.props.open
    });

    return (
      <Container id='container' className={classes}>
        <Sidebar />
        <Header />
        <Body />
        <Footer />
      </Container>
    );
  }
}
