import axios from 'axios'
import React from 'react'


const axiosPublic =  axios.create({
    baseURL: 'https://be-vdev-foods-project.vercel.app',
  })

const useAxiosPublic = () => {
  return axiosPublic
}

export default useAxiosPublic;

  