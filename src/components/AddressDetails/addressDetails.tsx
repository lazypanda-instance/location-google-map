type Props = {
    address: []
}

const Address = (props: Props) => {
    const {
        address
    } = props;

    const type = ['premise', 'political', 'landmark', 'postal_code']

    return (
        <div>
            {address.length && address?.map((pos: any, index: number) => (
                <div key={index}>
                    {pos.types.filter((typeStr: string) => type.some(ty => ty === typeStr)) ? pos.long_name : ''}
                </div>
            ))}
        </div>
    );
}

export default Address;