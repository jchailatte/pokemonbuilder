import { Fragment } from 'react';
import { useSession, getSession } from 'next-auth/client';

const TeamSelect = () => {
    return (
        <Fragment>
            auth
        </Fragment>
    )
}

const TeamSelectPage = () => {
    const [session, loading] = useSession();

    if (loading) return null;
    if (!loading && !session) {
        return (
            <p>
                Access Denied
            </p>
        )
    }

    return (
        <TeamSelect />
    )
}

export default TeamSelectPage;