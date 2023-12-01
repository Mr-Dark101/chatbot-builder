import React, { useEffect, useState, useContext } from 'react';
const Detail  = ({rs,getDetail,getTopic,getDepartment,closeModal}) => {

	return (

			<div>

					<div>Ticket # {rs.id}</div>
					<div>Help Topic {getTopic(rs)}</div>
					<div>Department {getDepartment(rs)}</div>
					<div>Detail
						<br />
						{getDetail(rs.complain_data)}
					</div>

					<div>Complain Data
						<br />
						{JSON.parse(rs.complain_data).map((item,index) => {
							if(index > 0){

								return (


										<div key={index}>
											<div>{item.name}: {item.value}</div>
										</div>


									)
							}
						})}
					</div>



					<button onClick={() => closeModal()} type="button" className="ant-btn ant-btn-default ms-10">
                                 Close
                              </button>

			</div>
		)
}

export default Detail