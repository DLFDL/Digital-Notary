import React from "react";
import '../../App.css';
import { DataGrid } from '@mui/x-data-grid'
import { useEthers, useCall } from "@usedapp/core";
import { utils, Contract } from 'ethers';
import { notaryAbi } from '../../constants/notaryAbi'

const AllHashes = () => {
  const { account } = useEthers()
  const notaryInterface = new utils.Interface(notaryAbi)
  const notaryAddress = '0x6e3d243ffFf77cC40f12ba718F90A1F75de541D7'
  const contract = new Contract(notaryAddress, notaryInterface)

  const hashData = useCall(account && {
    contract,
    method: 'getHashes',
    args: [account],
  }) ?? { value: [[]] }
  
  const hashDatas = hashData?.value[0]?.map((val, index) => {
    return {
        hash: val[0],
        date: new Date(val[1] * 1000).toLocaleString(),
        id: index,
    }
})

  return (
    <div className='hero-container'>
    <video src='/videos/video-2.mp4' autoPlay loop muted />
      <DataGrid
        style={{color: 'white', width: '1000px'}}
        rows={hashDatas}
        columns={columns}
        pageSize={15}
        rowsPerPageOptions={[15]}
      />
    </div>
  );
};

export default AllHashes;

const columns = [
    { field: 'hash', headerName: 'The file SHA256 digital signature hash:', width: 650 },
    { field: 'date', headerName: 'Date:', width: 300 },
  ]
