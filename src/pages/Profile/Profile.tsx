import { useState } from "react";
import { PersonalData } from "../../components/PersonalData";
import { Security } from "../../components/Security";
import { MainLayout } from "../layouts/MainLayout";
import { Container, ProfileMenu, ProfileMenuItem } from "./Profile.styles";

type ProfleTab = 'personal-data' | 'security'

export function Profile() {
  const [profileTab, setProfileTab] = useState<ProfleTab>('personal-data')

  const handleChangeProfileTab = (tab: ProfleTab) => setProfileTab(tab)

  return (
    <MainLayout>
      <h1>Meu perfil</h1>

      <Container>
        <ProfileMenu>
          <ul>
            <ProfileMenuItem 
              isActive={profileTab === 'personal-data'} onClick={() => handleChangeProfileTab('personal-data')}
            >
              Dados Pessoais
            </ProfileMenuItem>
            <ProfileMenuItem 
              isActive={profileTab === 'security'}
              onClick={() => handleChangeProfileTab('security')}
            >
              Segurança
            </ProfileMenuItem>
          </ul>
        </ProfileMenu>

        {profileTab === 'personal-data' && <PersonalData />}
        {profileTab === 'security' && <Security />}

      </Container>
    </MainLayout>
  )
}