import { Users } from '@intern-place/types';

interface Props {
  user?: Users.User;
}

export default function UserProfile(props: Props) {
  return (
    <div>
      <h1>Welcome to UserProfile!</h1>
    </div>
  );
}
