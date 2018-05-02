import React from 'react';
import { Form, Input, Button, Icon } from "semantic-ui-react";

class GtfsUpload extends React.Component {
    constructor(props) {
        super(props);
        this.handleFileUpload = this.handleFileUpload.bind(this);
    }

    handleFileUpload(evt) {
        //const file = evt.target.files[0];
        debugger;
        evt.preventDefault();
        const file = this.refs.gtfsfile.files[0];
        this.props.postGtfs({file})
      }

    render() {
        const displayNone = {
            display: 'none',
          };

           {/*<Form  onSubmit={this.handleFileUpload}>
                <Form.Group inline>
                <Form.Input action>
                    <Input type="text" placeholder="Chose file" readOnly  />
                    <input type="file" style={{display: 'none'}} />
                    <Button icon="attach" />
                </Form.Input>
                <Form.Button submit basic>Upload
                </Form.Button>
                </Form.Group>
        </Form>*/}

        return(
            <Form  onSubmit={this.handleFileUpload}>
                <Form.Group inline>
                <Form.Field>
                <input name="file" ref="gtfsfile" type="file" />
                </Form.Field>
                <Form.Button basic>Upload
                    {/*<input type="submit" name="Upload" value="Upload"  />*/}
                </Form.Button>
                </Form.Group>
            </Form>
        );

       
    }
}

export default GtfsUpload;