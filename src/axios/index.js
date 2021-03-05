import JsonP from "jsonp";
import axios from "axios";
import { Modal } from "antd";
import Utils from "../utils/utils";

export default class Axios {
  static requestList(_this, url, params) {
    var data = {
      params: params,
    };
    this.ajax({
      url: url,
      data: data,
      isMock: true,
    }).then((data) => {
      if (data && data.result) {
        let list = data.result.item_list.map((item, index) => {
          item.key = index;
          return item;
        });
        _this.setState({
          list,
          pagination: Utils.pagination(data, (currentPage) => {
            _this.params.page = currentPage;
            _this.requestList();
          }),
        });
      }
    });
  }
  static jsonp(options) {
    return new Promise((resolve, reject) => {
      JsonP(
        options.url,
        {
          param: "callback",
        },
        function (err, response) {
          if (response.status === "success") {
            resolve(response);
          } else {
            reject(response.message);
          }
        }
      );
    });
  }
  static ajax(options) {
    let loading;
    if (options.data && options.data.isShowLoading !== false) {
      loading = document.getElementById("ajaxLoading");
      loading.style.display = "block";
    }
    let baseApi = "";
    if (options.isMock === true) {
      baseApi =
        "https://www.fastmock.site/mock/895d6fbc3134a9583b58930d5f7a0f37/sharebike";
    } else {
      baseApi =
        "https://www.fastmock.site/mock/895d6fbc3134a9583b58930d5f7a0f37/sharebike";
        console.log("当前使用的是后端的API");
    }

    return new Promise((resolve, reject) => {
      axios({
        url: options.url,
        method: "get",
        baseURL: baseApi,
        timeout: 5000,
        params: (options.data && options.data.params) || "",
      }).then((response) => {
        if (options.data && options.data.isShowLoading !== false) {
          loading = document.getElementById("ajaxLoading");
          loading.style.display = "none";
        }
        if (response.status === 200) {
          const res = response.data;
          if (res.code === "0") {
            resolve(res);
          } else {
            Modal.info({
              title: "提示",
              content: res.msg,
            });
          }
        } else {
          reject(response.data);
        }
      });
    });
  }
}
