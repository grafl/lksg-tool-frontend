import Button from "react-bootstrap/Button";

// @ts-ignore
const Item = ({ company, handle1 }) => {

    return (
        <tr key={`co_${company.id}`}>
            <td>{company.name}</td>
            <td>{company.street}</td>
            <td>{company.nr}</td>
            <td>{company.zipCode}</td>
            <td>{company.location}</td>
            <td>{company.country}</td>
        </tr>
    );
}

export default Item;
