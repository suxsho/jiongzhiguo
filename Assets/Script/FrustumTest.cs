using UnityEngine;
using System.Collections;

public class FrustumTest : MonoBehaviour {
	
	public Camera gameCamera;

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
		GameObject[] objList = Object.FindSceneObjectsOfType(typeof(GameObject)) as GameObject[];
		Plane[] planes = GeometryUtility.CalculateFrustumPlanes(gameCamera);
		
		foreach (GameObject obj in objList)
		{
			if (obj == gameCamera)
				continue;
			
			Renderer rdr = obj.GetComponent<Renderer>();

			if (rdr == null)
				continue;
			
			if (GeometryUtility.TestPlanesAABB(planes, rdr.bounds))
			{
				Debug.DrawLine(obj.transform.position, GetComponent<Camera>().transform.position);
				Debug.Log("你才到碗里去");
			}
		}
	}
}
