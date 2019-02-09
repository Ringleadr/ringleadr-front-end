import React from "react";
import {Button, Form, Icon, Input} from "semantic-ui-react";

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

          <Form.Field>
            <label>Replicas</label>
            <Input name={'replicas'} value={this.props.component.replicas|| ''} placeholder={'#Replicas'} onChange={this.props.propsOnChange}/>
          </Form.Field>

          <Form.Field>
            <label>Scale Threshold</label>
            <Input name={'scale_threshold'} value={this.props.component.scale_threshold|| ''} placeholder={'Scale Threshold (100 equals 1CPU)'} onChange={this.props.propsOnChange}/>
          </Form.Field>

          <Form.Field>
            <label>Scale Min</label>
            <Input name={'scale_min'} value={this.props.component.scale_min|| ''} placeholder={'Minimum number of replicas when scaling'} onChange={this.props.propsOnChange}/>
          </Form.Field>

          <Form.Field>
            <label>Scale Max</label>
            <Input name={'scale_max'} value={this.props.component.scale_max|| ''} placeholder={'Maximum number of replicas when scaling'} onChange={this.props.propsOnChange}/>
          </Form.Field>

          <Form.Field>
            <label>Environment Variables <Button type={'button'} className={'add-button'} onClick={this.props.addEnv} size={'mini'} icon={'plus'}/></label>
            {this.props.component.env && this.props.component.env.map((e, i) => {
              return (
                <div className={'env-input-wrapper'} key={`env-${i}`}>
                  <Input
                    value={e}
                    onChange={(e) => this.props.envOnChange(e,i)}
                    placeholder={"KEY=VALUE"}
                    className={'env-input'}/>
                    <Button type={'button'} className={'delete-env'} negative icon={'close'} size={"mini"} onClick={() => this.props.envOnDelete(i)}/>
                </div>
              )
            })}
          </Form.Field>

          <Form.Field>
            <label>Ports <Button type={'button'} className={'add-button'} onClick={this.props.addPort} size={'mini'} icon={'plus'}/></label>
            {this.props.component.ports && this.props.component.ports.map((port, i) => {
              return (
                <div className={'port-input-wrapper'} key={`port-${i}`}>
                  <Input value={port.key} className={'port-input'} placeholder={'(HOST:)PORT on host'} onChange={(e) => this.props.portOnChangeKey(i, e)}/>
                  <Icon name={'arrow right'} className={'port-arrow'}/>
                  <Input value={port.value} className={'port-input'} placeholder={'PORT inside container'} onChange={(e) => this.props.portOnChangeVal(i, e)}/>
                  <Button type={'button'} className={'delete-port'} negative icon={'close'} size={"mini"} onClick={() => this.props.deletePort(i)}/>
                </div>
              )
            })}
          </Form.Field>

        </div>
        {this.props.deletable && <Button type={'button'} className={'delete-component'} negative icon={'close'} onClick={this.props.deleteOnClick}/>}
      </div>
    )
  }
}

export default ComponentForm
