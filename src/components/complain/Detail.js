import React, { useEffect, useState, useContext } from 'react';
const Detail  = ({rs,getDetail,getTopic,getDepartment,closeModal}) => {

	return (

			<div className="complain_ticket_section">

				<div className="box_section">
					<div className="text_section">
						<div style={{width: '40%'}}>
							<p><b>Status:</b></p>
						</div>

						<div style={{width: '60%'}}>
							<p>Open</p>
						</div>
					</div>

					<div className="d-flex align-items-center">
						<div className="text_section">
							<div style={{width: '40%'}}>
								<p><b>Priority:</b></p>
							</div>

							<div style={{width: '60%'}}>
								<p>Normal</p>
							</div>
						</div>

						<div className="text_section">
							<div style={{width: '40%'}}>
								<p><b>From:</b></p>
							</div>

							<div style={{width: '60%'}}>
								<p>+92 323 2986614</p>
							</div>
						</div>
					</div>

					<div className="d-flex align-items-center">
						<div className="text_section">
							<div style={{width: '40%'}}>
								<p><b>Department:</b></p>
							</div>

							<div style={{width: '60%'}}>
								<p>{getDepartment(rs)}</p>
							</div>
						</div>

						<div className="text_section">
							<div style={{width: '40%'}}>
								<p><b>Source:</b></p>
							</div>

							<div style={{width: '60%'}}>
								<p>WhatsApp</p>
							</div>
						</div>
					</div>

					<div className="d-flex align-items-center">
						<div className="text_section">
							<div style={{width: '40%'}}>
								<p><b>Created Date:</b></p>
							</div>

							<div style={{width: '60%'}}>
								<p>09/15/2023 10:00 AM</p>
							</div>
						</div>

						<div className="text_section">
							<div style={{width: '40%'}}>
								<p><b>Due Date:</b></p>
							</div>

							<div style={{width: '60%'}}>
								<p>09/16/2023</p>
							</div>
						</div>
					</div>
				</div>

				<div style={{display: 'none'}}>Ticket # {rs.id}</div>

				<div className="text_section">
					<p className="mb-10"><b>Help Topic:</b></p>

					<p>{getTopic(rs)} </p>
				</div>

				<div className="text_section">
					<p className="mb-10"><b>Ticket Details</b></p>

					<p>{getDetail(rs.complain_data)}</p>
				</div>

				<div className="text_section">
					<p className="mb-10"><b>Custom Fields</b></p>
				</div>

				<div className="table_row_section">
					<div className="column_section">
						<p><b>Field Name</b></p>
					</div>

					<div className="column_section">
						<p><b>Value</b></p>
					</div>
				</div>

				<div>
					
					{JSON.parse(rs.complain_data).map((item,index) => {
						if(index > 0){

							return (

									<div key={index} className="table_row_section">
										<div className="column_section">
											<p>{item.name}</p>
										</div>

										<div className="column_section">
											<p>{item.value}</p>
										</div>
									</div>

								)
						}
					})}
				</div>

				<div className="text_section mt-20">
					<p className="mb-10"><b>Change History</b></p>
				</div>

				<div className="text_section">
					<p><b>Ticket Created</b></p>
					<p>By 923232986614 on Nov 01, 2023 at 11:00 AM</p>
				</div>

				<div className="text_section">
					<p><b>Status Updated to In Process</b></p>
					<p>By Dilawar Abbas on Nov 01, 2023 at 11:00 AM</p>
				</div>



					<button onClick={() => closeModal()} type="button" className="ant-btn ant-btn-default ms-10">
                                 Close
                              </button>

			</div>
		)
}

export default Detail