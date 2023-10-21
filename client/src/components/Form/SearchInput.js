import React from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(`/api/v1/product/search/${values.keyword}`);
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    const userInput = e.target.value;

    // Define a regular expression to match valid characters (e.g., letters and numbers)
    const validCharacters = /^[a-zA-Z0-9\s]+$/;

    if (validCharacters.test(userInput) || userInput === "") {
      // Valid input or empty input is allowed
      setValues({ ...values, keyword: userInput });
    }
  };

  return (
    <div>
      <form className="d-flex search-form" role="search" onSubmit={handleSubmit}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={values.keyword}
          onChange={handleInputChange}
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchInput;