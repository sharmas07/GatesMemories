import { React, useEffect, useRef, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, useMantineTheme } from "@mantine/core";
import { Select } from "@mantine/core";
import { Loader } from "@mantine/core";
import SearchList from "./SearchList";
import axios from "axios";
import "./SearchModal.css";

const SearchModal = ({ modalOpened, setModalOpened }) => {
  const searchref = useRef()
  const [opened, { open, close }] = useDisclosure(false);
  const theme = useMantineTheme();
  const [loading, setLoading] = useState(false);
  const [searchString, setsearchString] = useState('');
  const [usersList, setUsersList] = useState([]);
 
  const onhandleSearch = async (e) => {
    setsearchString(e.target.value)
    if (searchref.current.value === '') {
      setUsersList([])
      return;
    }
    setLoading(true);
    const {data} = await axios.post('https://gatesmemoriesapi.onrender.com/user/search',{searchString:searchref.current.value})
    if (data.length !== 0) {
      console.log(data)
      setUsersList(data)
      setLoading(false)
    }
    else{
      setUsersList([]);
      setLoading(false)
    }
    // TODO : hit get users with username endpoint
  };


  return (
    <Modal
      size={"85%"}
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
      overlayProps={{
        color:
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[2],
        opacity: 0.55,
        blur: 3,
      }}
    >
      <div className="SearchModal__container">
        <div className="search_input_cont">
          <input
          ref={searchref}
            onChange={onhandleSearch}
            value={searchString}
            type="text"
            placeholder="Enter username"
          />
          <span className="search__btn" onClick={onhandleSearch}>
            Search
          </span>
        </div>
        <div
          style={{
            minHeight: "7rem",
            maxWidth: "43rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {loading ? <Loader /> : <SearchList searchString={searchString} data={usersList} />}
        </div>
      </div>
    </Modal>
  );
};

export default SearchModal;
