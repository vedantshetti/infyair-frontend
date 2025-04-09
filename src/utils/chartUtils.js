// Generate random colors for charts
export const generateColors = (count) => {
    const colors = [];
    for (let i = 0; i < count; i++) {
      const r = Math.floor(Math.random() * 200);
      const g = Math.floor(Math.random() * 200);
      const b = Math.floor(Math.random() * 200);
      colors.push(`rgba(${r}, ${g}, ${b}, 0.7)`);
    }
    return colors;
  };
  
  // Format data for pie charts
  export const formatPieData = (data, labelField, valueField) => {
    const labels = data.map(item => item[labelField]);
    const values = data.map(item => item[valueField]);
    const backgroundColor = generateColors(labels.length);
    
    return {
      labels,
      datasets: [
        {
          data: values,
          backgroundColor,
          borderWidth: 1,
        },
      ],
    };
  };
  
  // Format data for line charts
  export const formatLineData = (data, labelField, valueField, timeField) => {
    // Sort data by time field if provided
    const sortedData = timeField ? 
      [...data].sort((a, b) => new Date(a[timeField]) - new Date(b[timeField])) : 
      data;
    
    const labels = sortedData.map(item => item[labelField]);
    const values = sortedData.map(item => item[valueField]);
    
    return {
      labels,
      datasets: [
        {
          label: valueField,
          data: values,
          fill: true,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          tension: 0.4,
        },
      ],
    };
  };
  
  // Group data by a specific field
  export const groupDataByField = (data, field) => {
    return data.reduce((acc, item) => {
      const key = item[field];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
      return acc;
    }, {});
  };
  