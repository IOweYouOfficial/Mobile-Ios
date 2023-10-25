import React, {
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';

interface UserContextType {
  loginUsername: string | null;
  setLoginUsername: Dispatch<SetStateAction<string>>;
  loginPassword: string | null;
  setLoginPassword: Dispatch<SetStateAction<string>>;
  profileFirstName: string | null;
  setProfileFirstName: Dispatch<SetStateAction<string>>;
  profileLastName: string | null;
  setProfileLastName: Dispatch<SetStateAction<string>>;
  profileUsername: string | null;
  setProfileUsername: Dispatch<SetStateAction<string>>;
  profileEmail: string | null;
  setProfileEmail: Dispatch<SetStateAction<string>>;
  profilePassword: string | null;
  setProfilePassword: Dispatch<SetStateAction<string>>;
  profileVerify: string | null;
  setProfileVerify: Dispatch<SetStateAction<string>>;
  profilePhone: string | null;
  setProfilePhone: Dispatch<SetStateAction<string>>;
  profileLocation: string | null;
  setProfileLocation: Dispatch<SetStateAction<string>>;
  profilePicture: string | null;
  setProfilePicture: Dispatch<SetStateAction<string>>;
}

export const UserContext = createContext<UserContextType | null>(null);

interface UserContextProviderProps {
  children: ReactNode;
}

export const UserContextProvider = ({children}: UserContextProviderProps) => {
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [profileFirstName, setProfileFirstName] = useState('');
  const [profileLastName, setProfileLastName] = useState('');
  const [profileUsername, setProfileUsername] = useState('');
  const [profileEmail, setProfileEmail] = useState('');
  const [profilePassword, setProfilePassword] = useState('');
  const [profileVerify, setProfileVerify] = useState('');
  const [profilePhone, setProfilePhone] = useState('');
  const [profileLocation, setProfileLocation] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  return (
    <UserContext.Provider
      value={{
        loginUsername,
        setLoginUsername,
        loginPassword,
        setLoginPassword,
        profileFirstName,
        setProfileFirstName,
        profileLastName,
        setProfileLastName,
        profileUsername,
        setProfileUsername,
        profileEmail,
        setProfileEmail,
        profilePassword,
        setProfilePassword,
        profileVerify,
        setProfileVerify,
        profilePhone,
        setProfilePhone,
        profileLocation,
        setProfileLocation,
        profilePicture,
        setProfilePicture,
      }}>
      {children}
    </UserContext.Provider>
  );
};
