class BinaryCalc
{
    public static void printArray( int[] a )
    {
	for( int i = 0; i < a.length - 1; ++i )
            {
                System.out.println( a[ i ]);
            }
    } 
    public static String toDiffBase( int n, int base) {
        if (n == 0) {
            return "0";
        }
        String retval = "";
        // to convert any number to a different base- continue
        // to divide by desired base 
        while (n > 0) {
            int rem = n % base;
            retval = rem + retval;
            n = n / base;
        }
        // ends when no available dividend and last module retval equals 1
        return retval;
    }
    public static void main( String [] args )
    {
		int[] anArray; // will hold parsed colorString
        anArray = new int[ 7 ]; // color codes is always a length of 7 
		// get hexastring of color from front end
		// colorArg is the hexadecimal string produced by Clarifai from image analysis
        String colorCode = colorArg;
		// convert hexastring to base 16
     	for( int i = 0; i < colorCode.length(); ++i )
	    {
	       anArray[ i ] = Integer.parseInt(""+colorCode.charAt(i),16);

	    }// end for loop
		// convert decimal to binary
		String completeBinary = " ";
		for( int i = 0; i < anArray.length - 1; ++i )
	    {
		//String retval = toBinary( anArray[ i ] );
		String retval = toDiffBase( anArray[i],2);
		completeBinary = completeBinary + " " + retval;
	    }// end for loop
        // Print original hexadecimal Color Code
		System.out.println("Hexadecimal Color Code="+colorCode);
		// Print Color Code converted to Binary
		System.out.println("Binary Conversion="+completeBinary);
    }// end main function
}

/*
Binary Calculator is a simple java function that reads a string that is in "Hexadecimal" 
and converts into respective Binary value.

What did not get finished: Creating a servlet to communicate with Java code to javascript
and Clarifai was not working to produce color anaylsis of image

Solution: Converted Java code to javascript and embedded into js files


 */
