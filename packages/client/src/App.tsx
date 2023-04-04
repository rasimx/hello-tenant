import {useCallback, useEffect, useState} from 'react'
import {list, item} from './App.module.scss';
import Header from "./Header";
import {supabase} from "./supabaseClient";
import Auth from "./Auth";
import {gql, useLazyQuery, useQuery} from "@apollo/client";
import {Session} from "@supabase/gotrue-js/src/lib/types";
import {useCookies} from "react-cookie";
import Articles from "./Articles";

const GET_TENANTS = gql`
    query Tenants {
        tenants {
            id
            name
        }
    }
`;

interface Tenant {
  id: string,
  name: string
}


function App() {
  const [session, setSession] = useState<Session | null>(null)
  const [currentTenant, setCurrentTenant] = useState<Tenant | undefined>()

  const [cookies, setCookie] = useCookies(['tenant_id']);

  useEffect(() => {
    supabase.auth.getSession().then(({data: {session}}) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    getTenants().then(resp => {
      if (cookies.tenant_id) {
        const currentTenant = resp.data?.tenants.find(tenant => tenant.id == cookies.tenant_id)
        if (currentTenant) setCurrentTenant(currentTenant)
      }
    })
  }, [])


  const [getTenants, {loading, error, data}] = useLazyQuery<{ tenants: Tenant[] }>(GET_TENANTS);

  useEffect(() => {
    if (cookies.tenant_id) {
      const currentTenant = data?.tenants.find(tenant => tenant.id == cookies.tenant_id)
      if (currentTenant) setCurrentTenant(currentTenant)
    }
  }, [cookies, data])


  const changeTenant = useCallback((tenant: Tenant) => {
    setCookie("tenant_id", tenant.id)
  }, [])


  return (
    <div className="App">
      {!session ? <Auth/> : <>
        <Header title={currentTenant?.name}/>
        {currentTenant ? <Articles/> :
          <div className={list}>
            {data?.tenants && data.tenants.map((tenant) => (
              <div className={item} key={tenant.id} onClick={() => changeTenant(tenant)}>{tenant.name}</div>))}
          </div>
        }
      </>}

    </div>
  )
}

export default App
