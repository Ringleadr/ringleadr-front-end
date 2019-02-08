import React from "react";
import {Button, Form, Input} from "semantic-ui-react";

class ComponentForm extends React.Component {
  render() {
    return (
      <div className={'comp-wrapper'}>
        <div className={'comp-form'}>
          <Form.Field>
            <label>Name</label>
            <Input name={'name'} value={this.props.component.name || ''} placeholder={'Name'} onChange={this.props.propsOnChange}/>
          </Form.Field>

          <Form.Field required>
            <label>Image</label>
            <Input name={'image'} value={this.props.component.image|| ''} placeholder={'Image'} onChange={this.props.propsOnChange}/>
          </Form.Field>

          <Form.Field >
            <label>Replicas</label>
            <Input name={'replicas'} value={this.props.component.replicas|| ''} placeholder={'#Replicas'} onChange={this.props.propsOnChange}/>
          </Form.Field>

          <Form.Field >
            <label>Scale Threshold</label>
            <Input name={'scale_threshold'} value={this.props.component.scale_threshold|| ''} placeholder={'Scale Threshold (100 equals 1CPU)'} onChange={this.props.propsOnChange}/>
          </Form.Field>

          <Form.Field >
            <label>Scale Min</label>
            <Input name={'scale_min'} value={this.props.component.scale_min|| ''} placeholder={'Minimum number of replicas when scaling'} onChange={this.props.propsOnChange}/>
          </Form.Field>

          <Form.Field >
            <label>Scale Max</label>
            <Input name={'scale_max'} value={this.props.component.scale_max|| ''} placeholder={'Maximum number of replicas when scaling'} onChange={this.props.propsOnChange}/>
          </Form.Field>
        </div>
        {this.props.deletable && <Button className={'delete-component'} negative icon={'close'} onClick={this.props.deleteOnClick}/>}
      </div>
    )
  }
}

export default ComponentForm
