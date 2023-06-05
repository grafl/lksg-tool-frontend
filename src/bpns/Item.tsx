// @ts-ignore
const Item = ({ bpn }) => {

    return (
        <tr key={`bpni_${bpn.bpn}`}>
            <td>{bpn.bpn}</td>
            <td>{bpn.company_name}</td>
        </tr>
    );
}

export default Item;
