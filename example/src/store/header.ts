import { CommonHeaderState } from '@shopee-data/di-common-header-fe';
import { computed, action, observable } from '@shopee-data/reaction';
import { EProjectRole } from 'lib/constant';
import { groupBy } from 'lodash';

class CommonHeader {
  @observable
  private state: CommonHeaderState;

  @computed
  get currentProject() {
    return this.state?.projectData.find((p) => p.id === this.state.currentProjectCode);
  }

  @computed
  get projectRole() {
    const roles = groupBy(this.currentProject.projectRole.split(','));
    const key = Object.keys(EProjectRole).find((r) => roles[r]) as keyof typeof EProjectRole;
    return EProjectRole[key];
  }

  @computed
  public get projectCode() {
    return this.currentProject?.id;
  }

  @computed
  public get userEmail() {
    return this.state?.userInfo.email;
  }

  @action.bound
  public init(state: CommonHeaderState) {
    this.state = state;
  }

  @computed
  get isOpsOver() {
    return [EProjectRole.admin, EProjectRole.ops].includes(this.projectRole);
  }
}

export const header = new CommonHeader();
