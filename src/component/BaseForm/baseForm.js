import React, { Component } from "react";
import { Button, Checkbox, DatePicker, Form, Input, Select } from "antd";
import Utils from "../../utils/utils";

const FormItem = Form.Item;

export default class BaseForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  formRef = this.props.formRef;

  handleFilterSubmit = () => {
    let fieldsValue = this.formRef.current.getFieldsValue(true);
    this.props.filterSubmit(fieldsValue);
  };

  reset = () => {
    this.formRef.current.resetFields();
  };

  initFormList = () => {
    const formList = this.props.formList;
    const formItemList = [];
    if (formList && formList.length > 0) {
      formList.forEach((item, i) => {
        let label = item.label;
        let field = item.field;
        let initialValue = item.initialValue || "";
        let placeholder = item.placeholder;
        let width = item.width;
        if (item.type === "时间查询") {
          const begin_time = (
            <FormItem label="订单时间" key={field} name="begin_time">
              <DatePicker
                showTime={true}
                placeholder={placeholder}
                format="YYYY-MM-DD HH:mm:ss"
                style={{ width: 120 }}
              />
            </FormItem>
          );
          formItemList.push(begin_time);
          const end_time = (
            <FormItem label="~" colon={false} key={field} name="end_time">
              <DatePicker
                showTime={true}
                placeholder={placeholder}
                format="YYYY-MM-DD HH:mm:ss"
                style={{ width: 120 }}
              />
            </FormItem>
          );
          formItemList.push(end_time);
        } else if (item.type === "INPUT") {
          const INPUT = (
            <FormItem
              label={label}
              name={field}
              key={field}
              initialValue={initialValue}
            >
              <Input
                type="text"
                placeholder={placeholder}
                style={{ width: width }}
              ></Input>
            </FormItem>
          );

          formItemList.push(INPUT);
        } else if (item.type === "SELECT") {
          const SELECT = (
            <FormItem
              label={label}
              name={field}
              key={field}
              initialValue={initialValue}
            >
              <Select style={{ width: width }} placeholder={placeholder}>
                {Utils.getOptionList(item.list)}
              </Select>
            </FormItem>
          );

          formItemList.push(SELECT);
        } else if (item.type === "CHECKBOX") {
          const CHECKBOX = (
            <FormItem
              label={label}
              name={field}
              key={field}
              initialValue={initialValue}
              valuePropName="checked"
            >
              <Checkbox>{label}</Checkbox>
            </FormItem>
          );

          formItemList.push(CHECKBOX);
        } else if (item.type === "DATEPICKER") {
          const DATEPICKER = (
            <FormItem
              label={label}
              name={field}
              key={field}
              initialValue={initialValue}
            >
              <DatePicker
                showTime={true}
                placeholder={placeholder}
                format="YYYY-MM-DD HH:mm:ss"
                style={{ width: 120 }}
              />
            </FormItem>
          );

          formItemList.push(DATEPICKER);
        }
      });
    }
    return formItemList;
  };
  render() {
    return (
      <div>
        <Form layout="inline" ref={this.formRef}>
          {this.initFormList()}
          <Button
            type="primary"
            style={{ margin: "0 20px", float: "right" }}
            onClick={this.handleFilterSubmit}
          >
            查询
          </Button>
          <Button
            onClick={this.reset}
            style={{ margin: "0 20px", float: "right" }}
          >
            重置
          </Button>
        </Form>
      </div>
    );
  }
}
