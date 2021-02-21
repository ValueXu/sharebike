import React from "react";
import { Form, Select, Button, DatePicker } from "antd";

const FormItem = Form.Item;
const Option = Select.Option;

class FilterForm extends React.Component {
  render() {
    return (
      <Form layout="inline">
        <FormItem label="城市" name="city_id">
            <Select style={{ width: 100 }} placeholder="全部">
              <Option value="">全部</Option>
              <Option value="1">北京市</Option>
              <Option value="2">天津市</Option>
              <Option value="3">深圳市</Option>
            </Select>
        </FormItem>
        <FormItem label="订单时间" name="start_time">
            <DatePicker showTime formate="YYYY-MM-DD HH:mm:ss"/>
        </FormItem>
        <FormItem name="end_time">
            <DatePicker showTime formate="YYYY-MM-DD HH:mm:ss"/>
        </FormItem>
        <FormItem label="订单状态" name="op_mode">
            <Select style={{ width: 80 }} placeholder="全部">
              <Option value="">全部</Option>
              <Option value="1">进行中</Option>
              <Option value="2">结束行程</Option>
            </Select>
        </FormItem>
        <FormItem>
          <Button type="primary" style={{ margin: "0 20px" }}>
            查询
          </Button>
          <Button>重置</Button>
        </FormItem>
      </Form>
    );
  }
}

export default FilterForm;
