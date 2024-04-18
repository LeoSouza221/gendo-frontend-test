import { type Tab } from './Tabs';
import type { InjectionKey, Ref } from 'vue';

export const activeTab = Symbol() as InjectionKey<Ref<string>>;
export const addTab = Symbol() as InjectionKey<(value: Tab) => void>;
