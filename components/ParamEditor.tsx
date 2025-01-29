'use client'

import React, { HTMLInputTypeAttribute } from 'react';

export interface Param {
  id: number;
  name: string;
  type?: HTMLInputTypeAttribute;
}

interface ParamValue {
  paramId: number;
  value: string;
}

type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

type Color = RGB | RGBA | HEX;

export interface Model {
  paramValues: ParamValue[];
  colors?: Color[];
}

interface Props {
  params: Param[];
  model: Model;
}

class ParamEditor extends React.Component<Props> {
  state = {
    paramValues: this.props.model.paramValues.reduce((acc, param) => {
      acc[param.paramId] = param.value;
      return acc;
    }, {} as { [key: number]: string })
  };

  public getModel(): Model {
    const paramValues : ParamValue[] = this.props.params.map(param => ({
      paramId: param.id,
      value: this.state.paramValues[param.id] || '',
    }));
    
    return {
      paramValues,
      colors: []
    };
  }

  handleChange = (paramId: number, value: string) => {
    this.setState(prevState => ({
      paramValues: {
        ...prevState.paramValues,
        [paramId]: value
      }
    }));
  };

  render() {
    return (
      <div 
        style={{
          fontWeight: 'bold', 
          display:'grid', 
          gap: 5, 
          margin: 10,
        }}
      >
        {this.props.params.map(param => (
          <div
            style={{
              width: 350,
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              textAlign: 'center',
            }} 
            key={param.id}
          >
            <label>{param.name}</label>
            <input
              style={{
                fontWeight: 'inherit',
                padding: 2,
              }}
              type={param.type || 'string'}
              value={this.state.paramValues[param.id] || ''}
              onChange={e => this.handleChange(param.id, e.target.value)}
            />
          </div>
        ))}
          <pre>{JSON.stringify(this.getModel(), null, 4)}</pre>
      </div>
    );
  }
}

export default ParamEditor;