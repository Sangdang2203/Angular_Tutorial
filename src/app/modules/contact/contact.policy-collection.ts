import { Injectable } from "@angular/core";
import { BasePolicyCollection } from "../../core/policy/base.policy-collection";

@Injectable()
export class ContactPolicyCollection extends BasePolicyCollection {
  override readonly policyCollectionKey = 'contact';

  download(): boolean {
    // return this._policyService.has('item::download');
    return true;
  }
}
