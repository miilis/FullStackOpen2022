import axios from 'axios'
const url = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(url)
}

const create = (nameObject) => {
  return axios.post(url, nameObject)
}

const deleteId = (id) => {
  return axios.delete(`${url}/${id}`)
}

const updateId = (id, nameObject) => {
  return axios.put(`${url}/${id}`, nameObject)
}

export default {
  getAll,
  create,
  deleteId,
  updateId
}