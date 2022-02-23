import { Injectable } from '@nestjs/common';
import {
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
} from 'amazon-cognito-identity-js';
import { AuthRegisterDTO } from 'src/auth/dtos/auth-register.dto';
import { AwsCognitoConfig } from './aws-cognito.config';

@Injectable()
export class AwsCognitoService {
  private userPool: CognitoUserPool;

  constructor(private configCognito: AwsCognitoConfig) {
    this.userPool = new CognitoUserPool({
      UserPoolId: this.configCognito.userPoolId,
      ClientId: this.configCognito.clientId,
    });
  }

  async registerUser(authRegisterDTO: AuthRegisterDTO) {
    const { name, email, password, phone } = authRegisterDTO;

    return new Promise((resolve, reject) => {
      this.userPool.signUp(
        email,
        password,
        [
          new CognitoUserAttribute({
            Name: 'phone_number',
            Value: phone,
          }),
          new CognitoUserAttribute({
            Name: 'name',
            Value: name,
          }),
        ],
        null,
        (error, result) => {
          if (!result) {
            reject(error);
          } else {
            resolve(result.user);
          }
        },
      );
    });
  }
}
