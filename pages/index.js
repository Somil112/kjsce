import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Layout from '../components/Layout';
import { Link } from '../routes';
import { Input } from 'semantic-ui-react';
import FormData form 'form-data';

import Tesseract from 'tesseract.js';


class KycIndex extends Component {
  constructor(props) {
  super(props);

  this.state = {
    file: '',
    resilt: '',
  };
  this.onFormSubmit = this.onFormSubmit.bind(this);
  this.onChange = this.onChange.bind(this);
}

onChange(e) {
  this.setState({ file: e.target.files[0] })
}

onFormSubmit(e) {
  e.preventDefault()
  let name = this.state.file.name;
  const formData = new FormData();
  formData.append('file', this.state.file);
  axios.post(`${baseUrl}/api/v1/upload/fs/${name}`, formData.get('file'), {
    headers: {
     'Content-Type': 'image/png'
    }
  })
    .then(res => {
      console.log(res);
      if (res.data.code === 200) {
        toast.success(res.data.message);
      }
      else {
        toast.warn(res.data.message);
      }
    })
    .catch(err => {
      toast.error(err.message);
    })
}


//   state = {
//     result : '',
//     file : 'idjpg'
//   };
//
//
//   static async getInitialProps() {
//     const campaigns = await factory.methods.getDeployedkyc().call();
//     return { campaigns };
//   }
//
// //use this.onChange = this.onChange.bind(this)
//
//   onChange = event => {
//     // event.preventDefault();
//     this.setState({file : event.target});
//     console.log(event.target);
//   }
//
//   scanImage() {
//     console.log(this.state.file);
//     const filename = 'id.jpg';
//     Tesseract.recognize(filename)
//       .progress(function  (p) { console.log('progress', p)  })
//       .catch(err => console.error(err))
//       .then(function (result) {
//         console.log(result.text)
//         this.setState({result:result.text})
//         process.exit(0)
//       });
//
//
//   }


  // renderCampaigns() {
  //   const items = this.props.campaigns.map(address => {
  //     return {
  //       header: address,
  //       description: (
  //         <Link route={`/campaigns/${address}`}>
  //           <a>View Campaign</a>
  //         </Link>
  //       ),
  //       fluid: true
  //     };
  //   });
  //
  //   return <Card.Group items={items} />;
  // }





  render() {
    return (
      <Layout>
        <div>
          <h3>Open </h3>
          <h2> {this.state.result} </h2>
          <Link route="/kyc/new">
            <a>
              <Button
                floated="right"
                content="Create Campaign"
                icon="add circle"
                primary
              />
            </a>

          </Link>
          <Input type='file' accept='image/*'
              onChange={this.onChange} action='Upload' placeholder='mysite.com' labelPosition='right' />
            <Button onClick={this.scanImage}>Submit</Button>

        </div>
      </Layout>
    );
  }
}

export default KycIndex;

/*
import React from 'react'
import { Input } from 'semantic-ui-react'

const InputExampleLabeled = () => (
  < Input type='file' accept='image/*' onChange={this.onChange} action='Upload' placeholder='mysite.com' labelPosition='right' />
)

export default InputExampleLabeled
*/
