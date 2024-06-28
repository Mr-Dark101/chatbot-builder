import React, { useEffect, useRef } from "react";
import DataTables from "datatables.net";
import $ from 'jquery';

export function ReactDataTables({ statusList, onChange, columns, data, viewDetail, ...props }) {
  const tableRef = useRef(null);

  useEffect(() => {
    const options = {
      ...props,
      data: data,
      columns: columns.map((column, index) => {
        if (index === 0) {
          return {
            ...column,
            render: function (data, type, row) {
              return `<span class="view-detail" data-id="${data}">${data}</span>`;
            }
          };
        } else if (column.data === 'priority') { // Customize priority column based on the status
            return {
              ...column,
              render: function (data, type, row) {
                const priorityClass = data === 'High' ? 'priority-high' :
                                      data === 'Medium' ? 'priority-medium' :
                                      data === 'Low' ? 'priority-low' : '';
                return `<span class="priority-field ${priorityClass}">${data}</span>`;
              }
            };
        } else if (index === columns.length - 1) { // Customize last column
          return {
            ...column,
            render: function (data, type, row) {
              const selectedValue = row.status || ''; // Assuming selectedOption is a property in your row data
              const options = statusList.map(option => {
                return `<option value="${option.value}" ${option.label === selectedValue ? 'selected' : ''}>${option.label}</option>`;
              }).join('');
              return `
                <select class="custom-dropdown" data-id="${row.id}">
                  ${options}
                </select>
              `;
            }
          };
        }
        return column;
      }),
      language: {
        paginate: {
            previous: '<i class="fas fa-chevron-left"></i> Previous',  // Using Font Awesome icon for left arrow
            next: 'Next <i class="fas fa-chevron-right"></i>'  
        },
        lengthMenu: 'Show _MENU_ entries'
      }
    };

    // Initialize DataTables with the combined options
    const dt = new DataTables(tableRef.current, options);

    // Delegate click event for dynamically created elements
    const handleViewDetailClick = function() {
        const id = $(this).data('id');
        const row = data.find(res => res.id === id);
        viewDetail(row);
    };
  
    const handleDropdownChange = function() {
        const selectedValue = $(this).val();
        const rowId = $(this).data('id');
        const row = data.find(item => item.id === rowId);
        onChange(selectedValue, row.id);
    };


    // Attach event listeners
    $(tableRef.current).on('click', '.view-detail', handleViewDetailClick);
    $(tableRef.current).on('change', '.custom-dropdown', handleDropdownChange);

    return () => {
      // Clean up event listeners
      $(tableRef.current).off('click', '.view-detail', handleViewDetailClick);
      $(tableRef.current).off('change', '.custom-dropdown', handleDropdownChange);
      dt.destroy();
    };
  }, [props, columns, data, viewDetail, onChange]);

  return <table ref={tableRef}></table>;
}

export default ReactDataTables;
