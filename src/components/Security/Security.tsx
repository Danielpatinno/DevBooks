import { useState } from "react";
import { useError } from "../../hooks/useError";
import { useUpdatePasswordMutation } from "../../hooks/useUpdatePasswordMutation";

import { AlertBanner } from "../AlertBanner";
import { Button } from "../Button";
import { Input } from "../Input";
import { Container, UpdatePasswordContainer } from "./Security.styles";

export function Security() {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const { mutateAsync, isLoading } = useUpdatePasswordMutation() 
  const { error, handleError, clearError } = useError()
  const [success, setSuccess] = useState(false)

  const handleUpdatePassword = async () => {
    try {
      clearError()
      setSuccess(false)

      await mutateAsync({
        newPassword,
        currentPassword
      })

      setCurrentPassword('')
      setNewPassword('')
      setSuccess(true)
    } catch (error) {
      handleError(error)
    }
  }

  return (
    <Container>
      <h2>Segurança</h2> 

      <UpdatePasswordContainer>
        <Input 
          label="Senha Atual" 
          type='password' 
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <Input 
          label="Nova Senha" 
          type='password'
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <Button 
          onClick={handleUpdatePassword}
          disabled={!newPassword || !currentPassword || isLoading}
        >
          {isLoading ? 'Atualizando...' : 'Atualizar Senha'}
        </Button>
      </UpdatePasswordContainer>

      {success && (
        <AlertBanner 
          variant="success" 
          message="Senha atualizada com sucesso!"/>
      )}

      {error && <AlertBanner variant="error" message={error}/>}
    </Container>
  )
}