export const filterOrders = (orders, searchTerm, filters) => {
    return orders.filter(order => {
      // Search filter
      const matchesSearch = !searchTerm || 
        order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.material.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.workCenter.toLowerCase().includes(searchTerm.toLowerCase());
  
      // Release Status filter
      const matchesReleaseStatus = !filters.releaseStatus || 
        order.releaseStatus === filters.releaseStatus;
  
      // Execution Status filter
      const matchesExecutionStatus = !filters.executionStatus || 
        order.executionStatus === filters.executionStatus;
  
      // Work Center filter
      const matchesWorkCenter = !filters.workCenter || 
        order.workCenter === filters.workCenter;
  
      return matchesSearch && 
             matchesReleaseStatus && 
             matchesExecutionStatus && 
             matchesWorkCenter;
    });
  };
  
  export const sortOrders = (orders, sortConfig) => {
    return [...orders].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  };