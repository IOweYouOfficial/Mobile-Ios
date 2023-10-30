import React, {
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';

interface UserContextType {
  loginUsername: string;
  setLoginUsername: Dispatch<SetStateAction<string>>;
  loginPassword: string;
  setLoginPassword: Dispatch<SetStateAction<string>>;
  profileFirstName: string;
  setProfileFirstName: Dispatch<SetStateAction<string>>;
  profileLastName: string;
  setProfileLastName: Dispatch<SetStateAction<string>>;
  profileUsername: string;
  setProfileUsername: Dispatch<SetStateAction<string>>;
  profileEmail: string;
  setProfileEmail: Dispatch<SetStateAction<string>>;
  profilePassword: string;
  setProfilePassword: Dispatch<SetStateAction<string>>;
  profileVerify: string;
  setProfileVerify: Dispatch<SetStateAction<string>>;
  profilePhone: string;
  setProfilePhone: Dispatch<SetStateAction<string>>;
  profileLocation: string;
  setProfileLocation: Dispatch<SetStateAction<string>>;
  profilePicture: string;
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
