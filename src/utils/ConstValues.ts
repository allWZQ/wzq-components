const ConstValues = {
  // 默认antd分页配置
  defaultPageConfig: {
    pageSize: 10,
    current: 1,
    total: 0,
    defaultPageSize: 10,
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '50', '100', '200', '500', '1000'],
    showTotal: (total) => `共 ${total} 条`,
  },
  // notification错误提示语
  Notification: {
    NetError: -1,
    ServerError: -2,
    SocketError: -3,
  },
  // Cookie key
  LOCAL_KEYS: {
    OPERATE_TOKEN: 'OPERATE_TOKEN',
  },
};

export default ConstValues;
