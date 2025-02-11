import {db} from '@/lib/db'


type Props = {
    searchParams: { state: string; code: string };
    params: { subaccountId: string };
};

const Launchpad = ({ searchParams, params }: Props) => {

    const subaccountDetails = await db.subAccount.findUnique({
        where: {
            id: params.subaccountId,
        },
    });

    return <div>Launchpad</div>;
};

export default Launchpad;
