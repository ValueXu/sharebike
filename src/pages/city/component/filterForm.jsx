import React from "react";
import { Form, Select, Button } from "antd";

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
        <FormItem label="用车模式" name="mode">
            <Select style={{ width: 120 }} placeholder="全部">
              <Option value="">全部</Option>
              <Option value="1">指定停车点模式</Option>
              <Option value="2">禁停区模式</Option>
            </Select>
        </FormItem>
        <FormItem label="营运模式" name="op_mode">
            <Select style={{ width: 80 }} placeholder="全部">
              <Option value="">全部</Option>
              <Option value="1">自营</Option>
              <Option value="2">加盟</Option>
            </Select>
        </FormItem>
        <FormItem label="加盟商授权授权状态" name="auth_status">
            <Select style={{ width: 100 }} placeholder="全部">
              <Option value="">全部</Option>
              <Option value="1">已授权</Option>
              <Option value="2">未授权</Option>
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
