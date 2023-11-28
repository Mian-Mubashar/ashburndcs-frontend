import React, { useState, useEffect } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import { useNavigate } from "react-router-dom";
import { Toast } from "helpers/Alert";
import axios from "axios";

// ... (other imports)
const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;

const FormContainer = styled.div`
  ${tw`p-10 sm:p-12 md:p-16 bg-primary-500 text-gray-100 rounded-lg relative`}
  form {
    ${tw`mt-4`}
  }
  h2 {
    ${tw`text-3xl sm:text-4xl font-bold`}
  }
  input,
  textarea {
    ${tw`w-full bg-transparent text-gray-100 text-base font-medium tracking-wide border-b-2 py-2 text-gray-100 hocus:border-pink-400 focus:outline-none transition duration-200`};

    ::placeholder {
      ${tw`text-gray-500`}
    }
  }
`;

const TableContainer = styled.div`
  ${tw`mt-8`}
  table {
    ${tw`min-w-full bg-white border border-gray-300`}
  }
  th, td {
    ${tw`py-2 px-4 border-b`}
  }
`;

// ... (rest of the component)

export default () => {
  // ... (existing code)

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4200/api/learning/view").then((response) => {
      setTableData(response?.data);
    });
  }, []);
console.log(tableData.data)
  return (
    <Container>
      <Content>
      <FormContainer>
          <div tw="mx-auto max-w-4xl">
            <h2>Edit & Delete Data</h2>
          </div>
        </FormContainer>

        {/* Table section */}
        <TableContainer>
        <div tw="mt-16">
          {/* <h2 className="text-3xl font-bold mb-4">Table Data</h2> */}
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Heading</th>
                <th className="py-2 px-4 border-b">subHeading</th>
                <th className="py-2 px-4 border-b">Action</th>

              </tr>
            </thead>
            <tbody>
              {tableData?.data?.map((row) => (
                <tr key={row.id}>
                  <td className="py-2 px-4 border-b">{row?.heading}</td>
                  <td className="py-2 px-4 border-b">{row?.subHeading}</td>
                  <td className="py-2 px-4 border-b">{row?.description}</td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
          {/* <h2>Table Data</h2>
          <table>
            <thead>
              <tr>
                <th>Heading</th>
                <th>Sub Heading</th>
                <th>Description</th>
                <th>Button Text</th>
              </tr>
            </thead>
            <tbody>
              {tableData?.data?.map((rowData) => (
                <tr key={rowData?.id}>
                  <td>{rowData?.heading}</td>
                  <td>{rowData?.subHeading}</td>
                  <td>{rowData?.description}</td>
                  <td>{rowData?.primaryButtonText}</td>
                </tr>
              ))}
            </tbody>
          </table> */}
        </TableContainer>

      </Content>
    </Container>
  );
};
